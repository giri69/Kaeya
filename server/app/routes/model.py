from fastapi import APIRouter, HTTPException
from app.schemas.model import Ranmodel, RansomwareResponse
from app.services.ransome import predict_ransomware

router = APIRouter(prefix="/model", tags=["Model"])

    
@router.get("/predict-ransomware")
def get_ransomware_predictions():
    """
    API endpoint to predict ransomware status from the CSV file.
    Returns:
        list: List of dictionaries with file names and ransomware status.
    """
    try:
        # Predict ransomware status
        results = predict_ransomware()

        return results
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")