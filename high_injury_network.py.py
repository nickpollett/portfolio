import pandas as pd
import re


def standardize_location(location: str) -> str:
    # Uppercase and clean
    location = location.upper().strip()

    # Remove 'BLOCK' designation
    location = location.replace('BLOCK ', '')

    # Special handling for generic 'ST E/W' or 'AVE N/S'
    if location in ['ST E', 'ST W', 'AVE N', 'AVE S', 'AVE C N', 'AVE S']:
        return location

    # Handle intersections - extract meaningful street names
    if ' & ' in location or ' AND ' in location:
        # Split and filter out generic terms
        parts = [
            part.strip()
            for part in re.split(r'&|AND', location)
            if part.strip() not in ['ST E', 'ST W', 'AVE N', 'AVE S']
        ]

        # Filter and standardize parts
        filtered_parts = [
            part for part in parts
            if not part.startswith('ST ') and not part.startswith('AVE ')
        ]

        return filtered_parts[0] if filtered_parts else location

    # Handle addresses
    address_match = re.search(
        r'(\d+)?\s*([A-Z0-9]+(?:\s+[A-Z]+)*(?:\s+(?:ST|AVE|BLVD|RD|CRES|WAY|DR)(?:\s+[NESW])?)\b)',
        location
    )
    if address_match:
        return address_match.group(2)

    return location


def analyze_locations(df: pd.DataFrame):
    df['Standardized Location'] = df['Location'].apply(standardize_location)

    location_stats = df.groupby('Standardized Location').size().reset_index(name='Collision Count')
    total_collisions = location_stats['Collision Count'].sum()

    location_stats['Percentage of Total Collisions'] = location_stats['Collision Count'] / total_collisions * 100
    location_stats = location_stats.sort_values('Collision Count', ascending=False)

    location_stats['Cumulative Collision Percentage'] = location_stats[
                                                            'Collision Count'].cumsum() / total_collisions * 100

    return location_stats, total_collisions


def main():
    df = pd.read_csv("sps_traffic_collisions_personal_injury_january_1_2019_to_december_31_2024.csv")
    location_stats, total_collisions = analyze_locations(df)

    print(f"Total Collisions: {total_collisions}")
    print("\nTop 10 Locations by Collision Count:")
    print(location_stats.head(10))
    location_stats.to_csv('collisions_5_year.csv')


if __name__ == "__main__":
    main()