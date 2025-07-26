from pydantic import BaseModel
from typing import List


class CompareStocksRequest(BaseModel):
    symbols: List[str]
