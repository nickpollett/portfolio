import seaborn
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load the data
transactions = pd.read_csv('simulated_transactions.csv')

# Summary statistics on amount column
transactions['amount'].describe()

# Create isPayment, isMovement, accountDiff fields
transactions['isPayment'] = 0
transactions.loc[(transactions['type'] == 'PAYMENT, DEBIT'), "isPayment"] = 1
transactions.loc[(transactions['type'] == 'CASH_OUT','TRANSFER'), "movement"] = 1
transactions['accountDiff'] = abs(transactions['oldbalanceDest'] - transactions['oldbalanceOrg'])
# Create features and label variables
features = transactions[['amount', 'isPayment', 'isMovement', 'accountDiff']]
label = transactions['isFraud']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(features, label, test_size = 0.3)

# Normalize the features variables
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Fit the model to the training data
logisticRegression = LogisticRegression()
logisticRegression.fit(X_train, y_train)

# Score the model on training and test data
print(logisticRegression.score(X_train, y_train))
print(logisticRegression.score(X_test, y_test))
print(logisticRegression.coef_)

# New transaction data
transaction1 = np.array([123456.78, 0.0, 1.0, 54670.1])
transaction2 = np.array([98765.43, 1.0, 0.0, 8524.75])
transaction3 = np.array([543678.31, 1.0, 0.0, 510025.5])
transaction4 = np.array([6472.54, 1.0, 0.0, 55901.23])
sample_transactions = np.stack((transaction1,transaction2,transaction3,transaction4))
sample_transactions = scaler.transform(sample_transactions)

# Predict fraud on the new transactions
print(logisticRegression.predict(sample_transactions))

# Show probabilities on the new transactions
print(logisticRegression.predict_proba(sample_transactions))