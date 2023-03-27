import pandas as pd
df = pd.read_csv('PincodeInfo.csv', encoding='utf8').drop_duplicates(subset=["Pincode"])
df.to_csv('ProcessedPincodeInfo.csv', index=False)
