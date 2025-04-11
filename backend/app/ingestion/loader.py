import pandas as pd
from app.utils.paths import DATA_DIR
from pathlib import Path

import logging
logger = logging.getLogger(__name__)

logger.info("Zillow housing market data Initializing...")

# Path to the data file
DATA_FILE = DATA_DIR / "Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv"

# TODO: add dynamic loading for user-provided data --> dynamic ingestion
try:
    logger.info("Loading the csv file")
    _df = pd.read_csv(DATA_FILE)

    logger.info("Renaming columns")
    _df.columns = _df.columns.str.strip().str.lower()

    logger.info("Transforming dataframe to place date data into rows")
    _df_melted = _df.melt(
        id_vars=['regionid', 'sizerank', 'regionname', 'regiontype', 'statename'],
        var_name='date',
        value_name='zhvi_price'
    )

    logger.info("Adjusting date format, casting housing price to numeric")
    _df_melted['date'] = pd.to_datetime(_df_melted['date'], errors='coerce')
    _df_melted['zhvi_price'] = pd.to_numeric(_df_melted['zhvi_price'], errors='coerce')

    logger.info("Removing null values")
    _df_melted.dropna(
        subset=['zhvi_price', 'regionid', 'sizerank', 'regionname', 'regiontype', 'statename'],
        inplace=True
    )
    # set city and state columns
    logger.info("Adding City and State columns")
    _df_melted[["city", "state"]] = _df_melted["regionname"].str.split(",", expand=True).apply(lambda x: x.str.strip())


    logger.info("Init - region map")
    _locations_dict = _df_melted.groupby("state")["city"].apply(lambda x: sorted(x.unique())).to_dict()

except FileNotFoundError as e:
    print("❌ Couldn't locate the file!")
    print(f"Expected file at: {DATA_FILE}")
    print(e)

# --- Public utility functions ---

def load_city_data(city: str, state: str) -> pd.DataFrame:
    """
    Filter and return clean data for a specific city.
    """
    logger.info("Extracting city data from larger dataframe")
    return _df_melted[(_df_melted['city'].str.lower() == city.lower()) & (_df_melted['state'].str.lower() == state.lower())].copy()


def get_locations_map() -> dict:
    """
    Provide locations dict for dropdown selectors
    """
    return _locations_dict

