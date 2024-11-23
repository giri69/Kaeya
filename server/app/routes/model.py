from fastapi import APIRouter, HTTPException
from app.services.host import create_host, get_host, update_host, delete_host, get_hosts_by_user_id
from app.schemas.model import Ranmodel, RansomwareResponse
from typing import List
from app.services.ransome import is_ransomware


router = APIRouter(prefix="/model", tags=["Model"])

@router.post("/isransome", response_model=RansomwareResponse)
async def is_ransomware_route(request: Ranmodel):
    # Define the feature list required for the model
    features = ['ImageBase', 'VersionInformationSize', 'SectionsMaxEntropy']

    # Convert the request body to a dictionary
    sample = request.dict()

    try:
        # Validate the presence of all required features in the request
        for feature in features:
            if feature not in sample:
                raise ValueError(f"Missing required feature: {feature}")

        # Call the ransomware detection logic
        result = is_ransomware(sample, features)

        # Return the result as part of the RansomwareResponse schema
        return RansomwareResponse(result=result)

    except FileNotFoundError:
        raise HTTPException(
            status_code=500, detail="The ransomware detection model is not found. Please ensure the model is available."
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
