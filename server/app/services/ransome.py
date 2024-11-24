from fastapi import FastAPI, HTTPException
import pandas as pd
import pickle
import os

# FastAPI app instance
app = FastAPI()

# Paths
MODEL_PATH = os.path.join("app", "services", "ransomware_model.pkl")
CSV_FILE_PATH =  os.path.join("app", "services", "Ransomware.csv")  
# server/app/services/Ransomware.csv# Path to your ransomware data CSV file
print(CSV_FILE_PATH)

# List of features required by the model
FEATURES = ['ImageBase', 'VersionInformationSize', 'SectionsMaxEntropy']


def load_model(file_path):
    """
    Load the trained ransomware detection model from the specified file path.
    """
    try:
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
            print(f"Model successfully loaded from {file_path}")
            return model
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Model file not found.")
    except pickle.UnpicklingError:
        raise HTTPException(status_code=500, detail="Model file is corrupted.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error loading model: {e}")


def load_csv(file_path, required_columns, num_rows=1000):
    """
    Load the CSV file containing ransomware data and retrieve only the required columns.
    Optionally limit the number of rows loaded.
    """
    try:
        # Load the CSV file with the correct delimiter and limit rows
        data = pd.read_csv(file_path, sep='|', usecols=required_columns, nrows=num_rows)
        
        if data.empty:
            raise HTTPException(status_code=400, detail="CSV file is empty.")
        print(f"CSV file successfully loaded with columns: {list(data.columns)} and {len(data)} rows.")
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="CSV file not found.")
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="CSV file is empty.")
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Column error: {ve}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading CSV file: {e}")




def preprocess_data(data, features):
    """
    Extract the required features from the dataframe.
    """
    try:
        missing_features = [feature for feature in features if feature not in data.columns]
        if missing_features:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required feature(s) in the CSV file: {missing_features}",
            )
        return data[features], data['Name']
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing required feature(s): {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error preprocessing data: {e}")


def predict_ransomware():
    """
    Predict ransomware status for each file using the model and CSV data.
    Extracts features from the CSV file, preprocesses data, and returns predictions.
    Returns:
        list: List of dictionaries with file names and ransomware status.
    """
    try:
        # Load the model
        model = load_model(MODEL_PATH)

        # Specify the columns to extract
        required_columns = ['Name', 'ImageBase', 'VersionInformationSize', 'SectionsMaxEntropy']
        
        # Load and preprocess CSV data
        data = load_csv(CSV_FILE_PATH, required_columns)
        print(f"Retrieved Data: \n{data.head()}")  # Debugging step
        
        # Split into features and file names
        input_data = data[['ImageBase', 'VersionInformationSize', 'SectionsMaxEntropy']]
        file_names = data['Name']

        # Perform predictions
        predictions = model.predict(input_data)

        # Format results
        results = [
            {"name": file_name, "isRansomware": bool(prediction == 0)}
            for file_name, prediction in zip(file_names, predictions)
        ]

        return results
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error during prediction: {e}")
