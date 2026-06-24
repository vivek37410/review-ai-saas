from supabase_client import supabase

def get_businesses():
    return supabase.table("businesses").select("*").execute()

def get_business_by_id(business_id):
    return supabase.table("businesses").select("*").eq("id", business_id).execute()
from supabase_client import supabase

def get_business_by_id(business_id):
    return supabase.table("businesses") \
        .select("*") \
        .eq("id", business_id) \
        .execute()
def create_business(user_id, name, category):
    data = supabase.table("businesses").insert({
        "user_id": user_id,
        "name": name,
        "category": category
    }).execute()

    return data