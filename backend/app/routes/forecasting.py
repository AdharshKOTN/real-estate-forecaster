from flask import Blueprint, request, jsonify
from app.services.prophet_service import generate_forecast
import logging
logger = logging.getLogger(__name__)

forecast_bp = Blueprint('forecast', __name__)

@forecast_bp.route('/forecast', methods=['GET'])
def forecast():
    city = request.args.get('city')
    state = request.args.get('state')
    months = int(request.args.get('months', 12))

    if not city:
        logger.error(f"City not found in request")
        return jsonify({"error": "Missing 'city' parameter"}), 400
    
    if not state:
        logger.error(f"State not found in request")
        return jsonify({"error": "Missing 'state' parameter"}), 400

    try:
        forecast_df = generate_forecast(city=city, state=state, months=months)
        return forecast_df.to_json(orient='records'), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        # print(e)
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
