import pandas as pd
from prophet import Prophet
from app.ingestion.loader import load_city_data
import logging
logger = logging.getLogger(__name__)


def generate_forecast(city: str, state: str, months: int = 12) -> pd.DataFrame:
    """
    Generates a forecast for a given city using Prophet.
    
    Parameters:
        city (str): The city name (case-insensitive) to forecast
        months (int): How many months into the future to forecast

    Returns:
        pd.DataFrame: Forecast result with ds, yhat, yhat_lower, yhat_upper
    """
    logger.info("Loading City Data")
    city_df = load_city_data(city=city, state=state)

    if city_df.empty:
        logger.error("City DF not populated")
    # Prepare the data for Prophet
    # TODO: could prep this before hand in server
    
    logger.info("Adjusting Data frame for use in Prophet")
    ts = city_df[['date', 'zhvi_price']].rename(columns={'date': 'ds', 'zhvi_price': 'y'})

    last_date = ts['ds'].max()

    logger.info("Init - Prophet model")
    model = Prophet()
    # if not model:
    #     raise RuntimeError(f"Model failed to initialize")
    logger.info("Fitting model to adjusted dataframe")
    model.fit(ts)

    logger.info("Making forecast data")
    future = model.make_future_dataframe(periods=months, freq='ME')
    # if not future:
    #     raise RuntimeError(f"Future Dataframe init failure")
    logger.info("Predicting future market")
    forecast = model.predict(future)

    # if not forecast:
    #     raise ValueError(f"Forecast data failure.")

    forecast['source'] = forecast['ds'].apply(lambda d: 'historical' if d <= last_date else 'forecast')

    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper', 'source']]