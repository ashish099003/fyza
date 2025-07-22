from pydantic import BaseModel\n\nclass SampleModel(BaseModel):\n    name: str\n    value: float
