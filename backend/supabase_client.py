from supabase import create_client

SUPABASE_URL = "https://kmrzkweyhefaxbgkmluq.supabase.co/rest/v1/"
SUPABASE_KEY = "sb_publishable_9J4hjKXDctC8zyypgg6Rmw_TUIlpgVP"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)