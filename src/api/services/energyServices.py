from config.supabaseConfig import supabase  # Asegúrate de que Supabase está bien configurado en Python

def get_energy_consumption(user_id):
    try:
        response = supabase.from_("user_consumption").select("date, consumption, peak_hours, recommended_action").eq("user_id", user_id).order("date", desc=True).limit(7).execute()
        consumption_data = response.data

        if not consumption_data:
            return "No hay suficientes datos de consumo para generar recomendaciones."

        return consumption_data
    except Exception as e:
        print(f"🚨 Error en get_energy_consumption: {str(e)}")
        return None

