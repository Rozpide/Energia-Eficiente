import openai
import os
from flask import jsonify  # ✅ Importamos jsonify correctamente
from config.supabaseConfig import supabase
from api.services.energyServices import get_energy_consumption

# ✅ Inicializar OpenAI correctamente
openai.api_key = os.getenv("OPENAI_API_KEY")

def getEnergyAdvice(user_id):
    try:
        # ✅ Obtener datos de consumo desde Supabase
        response = supabase.from_("user_consumption").select("*").eq("user_id", user_id).order("date", desc=True).limit(7).execute()

        # ✅ Validar si la respuesta es válida
        if hasattr(response, "error") and response.error:
            return {"error": f"Error en Supabase: {response.error.message}"}  # ✅ Retorno limpio, sin `jsonify()`

        consumption_data = response.data

        if not consumption_data:
            return {"advice": "No hay suficientes datos de consumo para generar recomendaciones."}  # ✅ Retorno limpio, sin `jsonify()`

        # ✅ Formatear datos antes de enviar a OpenAI
        formatted_data = "\n".join([
            f"{item['date']}: {item['consumption']} kWh, {('horas pico' if item.get('peak_hours') else 'fuera de pico')}" 
            for item in consumption_data
        ])

        # ✅ Generar un prompt optimizado para OpenAI
        prompt = f"Basado en estos datos de consumo energético:\n{formatted_data}\n¿Qué consejos puedes dar para ahorrar energía?"

        response_ai = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "system", "content": "Eres un experto en eficiencia energética."},
                      {"role": "user", "content": prompt}],
            max_tokens=500
        )

        # ✅ Validar la estructura de la respuesta de OpenAI antes de acceder a `choices`
        if not hasattr(response_ai, "choices") or not response_ai.choices:
            return {"error": "Error: No se recibieron respuestas de la IA."}  # ✅ Retorno limpio, sin `jsonify()`

        # ✅ Imprimir la respuesta en consola antes de enviarla
        advice = response_ai.choices[0].message.content
        print("🔍 Respuesta enviada a Postman:", advice)

        # ✅ Retornar la respuesta sin `jsonify()`, porque Flask maneja automáticamente la conversión JSON
        return {"advice": advice}  # ✅ Retorno correcto

    except Exception as e:
        print(f"🚨 Error en getEnergyAdvice: {str(e)}")
        return {"error": f"Error al generar recomendaciones: {str(e)}"}  # ✅ Retorno limpio, sin `jsonify()`
