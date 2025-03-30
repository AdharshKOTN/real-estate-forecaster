import pandas as pd
from prophet import Prophet
from app.ingestion.loader import load_city_data


def generate_forecast(city: str, months: int = 12) -> pd.DataFrame:
    """
    Generates a forecast for a given city using Prophet.
    
    Parameters:
        city (str): The city name (case-insensitive) to forecast
        months (int): How many months into the future to forecast

    Returns:
        pd.DataFrame: Forecast result with ds, yhat, yhat_lower, yhat_upper
    """
    city_df = load_city_data(city)

    if city_df.empty:
        raise ValueError(f"No data found for city: {city}")

    # Prepare the data for Prophet
    ts = city_df[['date', 'zhvi_price']].rename(columns={'date': 'ds', 'zhvi_price': 'y'})

    model = Prophet()
    model.fit(ts)

    future = model.make_future_dataframe(periods=months, freq='ME')
    forecast = model.predict(future)

    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]