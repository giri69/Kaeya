import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, roc_auc_score
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from collections import Counter
import os

def preprocess_data(df, features):
    return df[features]

def train_model(X_train, y_train, random_seed=42):
    smt = SMOTE(random_state=random_seed)
    X_train_sm, y_train_sm = smt.fit_resample(X_train, y_train)
    
    rf = RandomForestClassifier(random_state=random_seed)
    rf.fit(X_train_sm, y_train_sm)
    return rf

def save_model(model, file_path):
    with open(file_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {file_path}")

def load_model(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
        print(f"Model loaded from {file_path}")
        return model
    else:
        return None

def is_ransomware(sample, model, features):
    sample_df = pd.DataFrame([sample])[features]
    prediction = model.predict(sample_df)
    return "Ransomware" if prediction[0] == 0 else "Legitimate"

if __name__ == "__main__":
    # Define file paths
    data_file = "Ransomware.csv"
    model_file = "ransomware_model.pkl"

    # Load dataset
    df = pd.read_csv(data_file, sep='|')
    features = ['ImageBase', 'VersionInformationSize', 'SectionsMaxEntropy']  # Example selected features
    target = 'legitimate'

    # Preprocess the dataset
    X = preprocess_data(df, features)
    y = df[target]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=42)

    # Load or train model
    model = load_model(model_file)
    if model is None:
        print("No saved model found. Training a new model...")
        model = train_model(X_train, y_train)
        save_model(model, model_file)
    else:
        print("Using the loaded model.")

    # Test the function with a sample data
    sample_data = {}
    sample_data['ImageBase'] = float(input("Enter ImageBase: "))
    sample_data['VersionInformationSize'] = float(input("Enter VersionInformationSize: "))
    sample_data['SectionsMaxEntropy'] = float(input("Enter SectionsMaxEntropy: "))
    result = is_ransomware(sample_data, model, features)
    print(f"The file is classified as: {result}")
