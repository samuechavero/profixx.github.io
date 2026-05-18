import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kgfbhcdggyxayodiomym.supabase.co'
const supabaseAnonKey = 'sb_publishable_Jy4H7M56K1d97qWkm0h9cg_G41N8Ek0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
