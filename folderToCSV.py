import os
import datetime
import csv

# Update this to folder to be examined
directory = r''

# Get info to create CSV from
def get_information(directory):
    file_list = []
    for i in os.listdir(directory):
        # Update path to file
        i_dir = directory + '\\' + i
        # Get the timestamp properly formatted
        time = os.path.getmtime(i_dir)
        date = datetime.date.fromtimestamp(time)
        date_f = date.strftime("%m/%d/%Y")
        # Add info
        file_list.append([i,date_f])
    return file_list

# Write the CSV to a file in the same directory as this script called out.csv
def write_to_csv(info):
    with open('out.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(info)

# Call Everything
write_to_csv(get_information(directory))
