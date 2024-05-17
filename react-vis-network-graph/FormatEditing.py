import pandas as pd
import random
veri = pd.read_csv("data.csv", delimiter=";")
veri=veri.head(100)

def format_file_data(row, index):
    
    
    
    if row["Detection_Method"] == "Manual Scan":
        
        return f"{{ id: {index+7},group:{1},size:{18}, title: \"{row['File_Name']}\", File_Type: \"{row['File_Type']}\", label: \"{row['Malware_Type']}\", Malware_Severity: \"{row['Malware_Severity']}\", Detection_Method: \"{row['Detection_Method']}\", Affected_Process: \"{row['Affected_Process']}\", Affected_System: \"{row['Affected_System']}\", User_Permissions: \"{row['User_Permissions']}\", Last_Modified_By: \"{row['Last_Modified_By']}\" }},"
    elif(row["Detection_Method"]=="Antivirus"):
       
        return f"{{ id: {index+7},group:{2}, size:{16},title: \"{row['File_Name']}\", File_Type: \"{row['File_Type']}\", label: \"{row['Malware_Type']}\", Malware_Severity: \"{row['Malware_Severity']}\", Detection_Method: \"{row['Detection_Method']}\", Affected_Process: \"{row['Affected_Process']}\", Affected_System: \"{row['Affected_System']}\", User_Permissions: \"{row['User_Permissions']}\", Last_Modified_By: \"{row['Last_Modified_By']}\" }},"
    elif(row["Detection_Method"]=="Firewall Detection"):
        
        return f"{{ id: {index+7},group:{3},size:{12},title: \"{row['File_Name']}\", File_Type: \"{row['File_Type']}\", label: \"{row['Malware_Type']}\", Malware_Severity: \"{row['Malware_Severity']}\", Detection_Method: \"{row['Detection_Method']}\", Affected_Process: \"{row['Affected_Process']}\", Affected_System: \"{row['Affected_System']}\", User_Permissions: \"{row['User_Permissions']}\", Last_Modified_By: \"{row['Last_Modified_By']}\" }},"

def format_to_from_detection_method(row, index):
    if(row["Detection_Method"]=="Manual Scan"):
        return f"{{ from: 1, to: {index+7} }},"
    elif (row["Detection_Method"]=="Antivirus"):
         return f"{{ from: 2, to: {index+7} }},"
    elif (row["Detection_Method"]=="Firewall Detection"):
         return f"{{ from: 3, to: {index+7} }},"
def format_to_MALWARESEVİTYMETOD(row, index):
    
    if(row["Malware_Severity"]=="Low"):
        return f"{{ from: 4, to: {index+7} }},"
    elif (row["Malware_Severity"]=="Medium"):
         return f"{{ from: 5, to: {index+7} }},"
    elif (row["Malware_Severity"]=="High"):
         return f"{{ from: 6, to: {index+7} }},"    
    
formatted_data = []
formatted_data_detecction = []
formatted_data_malwareseverity = []
for index, row in veri.iterrows():
    formatted_data.append(format_file_data(row, index))
for index, row in veri.iterrows():
    formatted_data_detecction.append(format_to_from_detection_method(row, index))
for index, row in veri.iterrows():
    formatted_data_malwareseverity.append(format_to_MALWARESEVİTYMETOD(row, index))
# Oluşturulan formatlı veriyi dosyaya yazdırma
with open("temiz.cypherr", "w") as file:
    for line in formatted_data:
        file.write(line + "\n")
with open("temiz_detection.cypher", "w") as file:
    for line in formatted_data_detecction:
        file.write(line + "\n")
with open("temiz_malwaresevrity.cypher", "w") as file:
    for line in formatted_data_malwareseverity:
        file.write(line + "\n")
