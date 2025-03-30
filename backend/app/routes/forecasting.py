from flask import Blueprint, request, jsonify
from app.services.prophet_service import generate_forecast

forecast_bp = Blueprint('forecast', __name__)

@forecast_bp.route('/forecast', methods=['GET'])
def forecast():
    city = request.args.get('city')
    months = int(request.args.get('months', 12))

    if not city:
        return jsonify({"error": "Missing 'city' parameter"}), 400

    try:
        forecast_df = generate_forecast(city=city, months=months)
        return forecast_df.to_json(orient='records'), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
