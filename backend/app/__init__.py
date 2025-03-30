from flask import Flask
from app.routes.forecasting import forecast_bp

def create_app():
    app = Flask(__name__)

    # Register Blueprints
    app.register_blueprint(forecast_bp)

    # You can add more config, extensions, or error handlers here later
    return app
