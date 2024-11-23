from pydantic import BaseModel
from typing import Optional

class Ranmodel(BaseModel):
    ImageBase: float
    VersionInformationSize: float
    SectionsMaxEntropy: float

class RansomwareResponse(BaseModel):
    result: str