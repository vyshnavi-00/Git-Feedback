import { createClient } from "@supabase/supabase-js";
import "./style.css";

// Get Supabase credentials from .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Get HTML elements
const form = document.getElementById("feedbackForm");
const thankyou = document.getElementById("thankyou");
const errorBanner = document.getElementById("errorBanner");
const submitBtn = document.getElementById("submitBtn");

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBanner.style.display = "none";
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";

  const data = new FormData(form);

  const payload = {
    objective_clear: data.get("objective_clear"),
    informative: data.get("informative"),
    met_expectations: data.get("met_expectations"),
    organized: data.get("organized"),
    time_management: data.get("time_management"),
    speaker_quality: data.get("speaker_quality"),
    presentation_clear: data.get("presentation_clear"),
    venue: data.get("venue"),
    av_quality: data.get("av_quality"),
    overall_rating: parseInt(data.get("overall_rating"), 10),
    liked_most: data.get("liked_most") || null,
  };

  try {
    const { error } = await supabaseClient
      .from("git_intro_feedback")
      .insert([payload]);

    if (error) {
      throw error;
    }

    form.style.display = "none";
    thankyou.style.display = "block";

  } catch (err) {
    console.error("Submit failed:", err);

    errorBanner.style.display = "block";
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Feedback";
  }
});