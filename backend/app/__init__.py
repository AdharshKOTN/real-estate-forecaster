from flask import Flask
from flask_cors import CORS
from app.routes.forecasting import forecast_bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])

    # Register Blueprints
    app.register_blueprint(forecast_bp)

    # You can add more config, extensions, or error handlers here later
    return app
