import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_absolute_error
from datetime import timedelta
from enum import Enum

class CallVolumeType(Enum):
    TOTAL = 'total'
    INBOUND = 'inbound'

def load_in(file_path) -> pd.DataFrame:
    """
    Converts a csv into a dataframe
    :param file_path: path from root with quotes
    :return: dataframe with all CSV data
    """
    df = pd.read_csv(file_path)
    return df

def preprocess_data(df: pd.DataFrame, volume_type: CallVolumeType = CallVolumeType.TOTAL) -> pd.DataFrame:
    """
    Formats the dates in the dataframe and calculates the call volume and its difference.
    :param df: input dataframe
    :param volume_type: type of call volume to predict (total or inbound)
    :return: DataFrame with datetime objects and additional columns for call volume and its difference
    """
    # Convert 'Daily Breakdown' to datetime
    df['Daily Breakdown'] = pd.to_datetime(df['Daily Breakdown'])
    df['date'] = df['Daily Breakdown']
    df.set_index('Daily Breakdown', inplace=True)

    # Fill missing values
    df = df.ffill()
    df['Inbound calls'] = df['Inbound calls'].replace({',': ''}, regex=True)
    df['Outbound calls'] = df['Outbound calls'].replace({',': ''}, regex=True)
    df['Inbound calls'] = pd.to_numeric(df['Inbound calls'], errors='coerce')
    df['Outbound calls'] = pd.to_numeric(df['Outbound calls'], errors='coerce')

    # Select call volume based on the volume_type parameter
    if volume_type == CallVolumeType.TOTAL:
        df['call_volume'] = df['Inbound calls'] + df['Outbound calls']
    elif volume_type == CallVolumeType.INBOUND:
        df['call_volume'] = df['Inbound calls']
    df['call_volume'] = pd.to_numeric(df['call_volume'], errors='coerce')

    # Calculate the difference in call volume between consecutive rows
    df['call_volume_diff'] = df['call_volume'].diff().dropna()
    return df


def add_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Calculate and add features to the DF
    :param df: Input df
    :return: Dataframe with added features
    """
    df = add_basics(df)
    df = add_month_and_week(df)
    return df


def add_basics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Add holidays, sale days, and day of the week (0-6) to the DataFrame.
    :param df: Input DataFrame with a 'date' column.
    :return: DataFrame with added 'day_of_week', 'is_holiday', and 'is_sale_day' columns.
    """
    holidays = [
        "2024-10-14", "2024-11-11", "2024-01-01", "2024-07-01",
        "2024-12-25", "2025-01-01", "2025-04-18", "2025-04-21",
        "2025-07-01", "2025-09-01", "2025-10-13", "2025-11-11",
        "2025-12-25"
    ]
    sale_days = ["2024-11-29", "2024-12-26", "2025-11-28"]
    holiday_set = set(holidays)
    sale_day_set = set(sale_days)

    df['day_of_week'] = df['date'].dt.dayofweek
    df['is_holiday'] = df['date'].apply(lambda x: 1 if x and x.strftime('%Y-%m-%d') in holiday_set else 0)
    df['is_sale_day'] = df['date'].apply(lambda x: 1 if x and x.strftime('%Y-%m-%d') in sale_day_set else 0)

    return df


def add_month_and_week(df: pd.DataFrame) -> pd.DataFrame:
    """
    Adds month(0-11) and week (0->51)
    :param df: Input dataframe
    :return: df with month and week_of_year columns added
    """
    df['month'] = df['date'].dt.month
    df['week_of_year'] = df['date'].dt.isocalendar().week.astype(int)
    return df


def split_data(df: pd.DataFrame):
    """
    Splits data into training and test sets, 80/20
    :param df: Input df
    :return: 4 dataframes for the test and training sets
    """
    # Here, we don't need to use X and y separately since ARIMA is univariate
    train_size = int(len(df) * 0.8)
    train, test = df[:train_size], df[train_size:]
    return train, test


def train_sarimax_model(df: pd.DataFrame):
    """
    Train the SARIMAX model using the training data.
    :param df: Training DataFrame with features and call volume
    :return: Trained SARIMAX model
    """
    # Ensure df is sorted properly
    df = df.sort_index()
    if 'date' in df.columns:
        df.set_index('date', inplace=True)

    # Prepare exogenous variables (features)
    exog_train = df[['day_of_week', 'is_holiday', 'is_sale_day', 'month', 'week_of_year']]
    exog_train = exog_train.apply(pd.to_numeric, errors='coerce')

    # Prep and fit the model
    model = SARIMAX(df['call_volume'],
                    exog=exog_train,
                    order=(1, 1, 1),
                    seasonal_order=(1, 1, 1, 7),
                    enforce_stationarity=False,
                    enforce_invertibility=False)
    result = model.fit(disp=False)

    return result


def evaluate_model(model, test: pd.DataFrame) -> SARIMAX:
    """
    Evaluate the trained SARIMAX model on the test data.
    :param model: Trained SARIMAX model
    :param test: Test DataFrame
    :return: Model predictions
    """
    exog_test = test[['day_of_week', 'is_holiday', 'is_sale_day', 'month', 'week_of_year']]
    start_idx = test.index.get_loc(test.index[0])
    end_idx = test.index.get_loc(test.index[-1])
    predictions = model.predict(start=start_idx, end=end_idx, exog=exog_test)
    mae = mean_absolute_error(test['call_volume'], predictions)
    print(f"Mean Absolute Error (MAE): {mae:.2f}")
    return predictions


def prepare_future_dates(df: pd.DataFrame, days_to_forecast: int) -> pd.DataFrame:
    """
    Creates df with future dates to predict
    :param df: Original dataframe
    :param days_to_forecast: Number of days to forecast
    :return: DataFrame with future dates and features
    """
    last_date = df['date'].max()
    future_dates = pd.date_range(start=last_date + timedelta(days=1), periods=days_to_forecast, freq='D')

    future_df = pd.DataFrame({'date': future_dates})
    future_df['day_of_week'] = future_df['date'].dt.dayofweek.astype(int)

    # Updated holidays and sale days for the specific date range
    holidays = [
        "2024-12-25",
        "2025-01-01"
    ]
    sale_days = [
        "2024-12-26"
    ]

    holiday_set = set(holidays)
    sale_day_set = set(sale_days)

    future_df['is_holiday'] = future_df['date'].apply(
        lambda x: 1 if x.strftime('%Y-%m-%d') in holiday_set else 0).astype(int)
    future_df['is_sale_day'] = future_df['date'].apply(
        lambda x: 1 if x.strftime('%Y-%m-%d') in sale_day_set else 0).astype(int)
    future_df['month'] = future_df['date'].dt.month.astype(int)
    future_df['week_of_year'] = future_df['date'].dt.isocalendar().week.astype(int)

    return future_df


def forecast(model, df: pd.DataFrame, future_df: pd.DataFrame) -> pd.Series:
    """
    Forecast future values using the SARIMAX model.
    :param model: Trained SARIMAX model
    :param df: Original data
    :param future_df: Future dates for prediction
    :return: Predicted call volumes for future dates
    """
    # Prep dfs
    df = df.copy()
    df.set_index('date', inplace=True)
    future_df = future_df.copy()

    # Define exogenous features
    exog_future = future_df[['day_of_week', 'is_holiday', 'is_sale_day', 'month', 'week_of_year']]
    exog_future = exog_future.apply(pd.to_numeric, errors='coerce')

    # Perform prediction using the model
    predictions = model.get_forecast(steps=len(future_df), exog=exog_future)
    pred_mean = predictions.predicted_mean.round().astype(int)
    series = pd.Series(pred_mean, index=future_df['date'])
    return series

def main(volume_type: CallVolumeType = CallVolumeType.TOTAL,
         file_path: str = r"C:\Users\nicholas.p_redwirele\Downloads\Total calls evolution.csv") -> None:
    """
    Main
    :param volume_type: Inbound or Total calls to predict
    :param file_path: Where the CSV is
    :return: None
    """
    # Suppress statsmodels warnings
    import warnings
    warnings.filterwarnings('ignore', category=UserWarning)

    # Get data set up
    df = load_in(file_path)
    df = preprocess_data(df, volume_type)
    df = add_features(df)

    # Train the model
    train, test = split_data(df)
    model = train_sarimax_model(train)
    predictions = evaluate_model(model, test)

    # Forecast future n days
    future_dates = prepare_future_dates(df, 30)
    forecasted_volumes = forecast(model, df, future_dates)

    print(f"Predicted {volume_type.value} call volumes for the next 30 days:")
    print(forecasted_volumes)

if __name__ == "__main__":
    main(CallVolumeType.TOTAL)  # For total call volume
    #main(CallVolumeType.INBOUND)  # For inbound call volume