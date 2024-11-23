import numpy as np
from sklearn.ensemble import IsolationForest

def detect():
    # Mock data
    data = np.random.rand(100, 5)
    model = IsolationForest(contamination=0.1)
    model.fit(data)
    predictions = model.predict(data)
    return {"anomalies": (predictions == -1).tolist()}
