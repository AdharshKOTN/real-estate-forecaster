import pandas as pd
from app.utils.paths import DATA_DIR
from pathlib import Path

# Path to the data file
DATA_FILE = DATA_DIR / "Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv"

# TODO: add dynamic loading for user-provided data --> dynamic ingestion
try:
    _df = pd.read_csv(DATA_FILE)

    _df.columns = _df.columns.str.strip().str.lower()

    _df_melted = _df.melt(
        id_vars=['regionid', 'sizerank', 'regionname', 'regiontype', 'statename'],
        var_name='date',
        value_name='zhvi_price'
    )

    _df_melted['date'] = pd.to_datetime(_df_melted['date'], errors='coerce')
    _df_melted['zhvi_price'] = pd.to_numeric(_df_melted['zhvi_price'], errors='coerce')

    _df_melted.dropna(
        subset=['zhvi_price', 'regionid', 'sizerank', 'regionname', 'regiontype', 'statename'],
        inplace=True
    )

except FileNotFoundError as e:
    print("❌ Couldn't locate the file!")
    print(f"Expected file at: {DATA_FILE}")
    print(e)

# --- Public utility functions ---

def load_city_data(city: str) -> pd.DataFrame:
    """
    Filter and return clean data for a specific city.
    """
    return _df_melted[_df_melted['regionname'].str.lower() == city.lower()].copy()


def get_cities() -> pd.Series:
    """
    Provide unique city names for dropdown selection.
    """
    return _df_melted['regionname'].dropna().unique()
