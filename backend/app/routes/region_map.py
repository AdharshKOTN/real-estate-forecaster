from flask import Blueprint, request, jsonify
from ..ingestion.loader import get_locations_map


region_map_bp = Blueprint('region_map', __name__)

@region_map_bp.route('/regions', methods=['GET'])
def get_region_map():
    try:
        region_map = get_locations_map()
        return region_map, 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
