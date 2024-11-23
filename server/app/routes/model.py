from fastapi import APIRouter, HTTPException
from app.schemas.model import Ranmodel, RansomwareResponse
from app.services.ransome import is_ransomware

router = APIRouter(prefix="/model", tags=["Model"])

@router.post("/isransome", response_model=RansomwareResponse)
async def is_ransomware_route(request: Ranmodel):
    try:
        # Extract features from the request
        sample = {
            "ImageBase": request.ImageBase,
            "VersionInformationSize": request.VersionInformationSize,
            "SectionsMaxEntropy": request.SectionsMaxEntropy,
        }

        # Define the feature list
        features = ['ImageBase', 'VersionInformationSize', 'SectionsMaxEntropy']

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
