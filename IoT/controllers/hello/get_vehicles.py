import requests
from datetime import datetime

def get_number_of_vehicles(data):
    url = "http://127.0.0.1:5000/"
    no_of_vehicles1 = 0
    no_of_vehicles2 = 0
    no_of_vehicles3 = 0
    no_of_vehicles4 = 0
    payload = {
        "option": "1",
        "data": data
    }
    print(payload)
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        result = response.json()
        no_of_vehicles1 = result[0][0]
        
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        
    payload["option"] = "2"
    payload["data"][0] = 2
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        result = response.json()
        no_of_vehicles2 = result[0][0]
        
    except requests.exceptions.RequestException as e:
        print("Error:", e)
    
    payload["option"] = "3"
    payload["data"][0] = 3
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        result = response.json()
        no_of_vehicles3 = result[0][0]
        
    except requests.exceptions.RequestException as e:
        print("Error:", e)

    payload["option"] = "4"
    payload["data"][0] = 4
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        result = response.json()
        no_of_vehicles4 = result[0][0]
        
    except requests.exceptions.RequestException as e:
        print("Error:", e)
    
    return [no_of_vehicles1,no_of_vehicles2,no_of_vehicles3,no_of_vehicles4]

current_datetime = datetime.now()
current_data = [current_datetime.year, current_datetime.month, current_datetime.day, current_datetime.hour, current_datetime.weekday()]

# result = get_number_of_vehicles(current_data)

# print("Number of vehicles:", result)
