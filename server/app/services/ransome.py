import pandas as pd
import pickle
import os

# Correct the file path as a string
file_path = os.path.join('server', 'app', 'services', 'ransomware_model.pkl')

def load_model():
    """
    Load the trained ransomware detection model from the specified file path.
    Raises:
        ValueError: If the model file is corrupted or cannot be loaded.
    """
    try:
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
            print(f"Model successfully loaded from {file_path}")
            return model
    except pickle.UnpicklingError:
        raise ValueError("The model file is corrupted or cannot be loaded.")
    except FileNotFoundError:
        raise ValueError("Model file not found. Ensure the file exists at the specified path.")

def is_ransomware(sample, features):
    """
    Predict whether a given sample is ransomware based on its features.
    Args:
        sample (dict): Input sample containing feature values.
        features (list): List of required features.
    Returns:
        str: "Ransomware" or "Legitimate" based on the prediction.
    Raises:
        ValueError: If the sample lacks the required features or prediction fails.
    """
    # Convert the sample to a DataFrame
    try:
        sample_df = pd.DataFrame([sample])[features]
    except KeyError as e:
        raise ValueError(f"Missing feature in sample: {e}")

    # Load the model
    model = load_model()

    # Perform the prediction
    try:
        prediction = model.predict(sample_df)
        return "Ransomware" if prediction[0] == 0 else "Legitimate"
    except Exception as e:
        raise ValueError(f"Model prediction failed: {str(e)}")
