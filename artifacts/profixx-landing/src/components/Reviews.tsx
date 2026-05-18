import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsProps {
  lang: "en" | "es";
}

const t = {
  en: {
    title: "Client Reviews",
    subtitle: "What our clients say about our work.",
    formTitle: "Leave a Review",
    namePlaceholder: "Your Name (optional)",
    reviewPlaceholder: "Share your experience with us...",
    submitBtn: "Publish Review",
    anonymous: "Anonymous",
    loading: "Loading reviews...",
  },
  es: {
    title: "Reseñas de Clientes",
    subtitle: "Lo que dicen nuestros clientes sobre nuestro trabajo.",
    formTitle: "Deja una Reseña",
    namePlaceholder: "Tu Nombre (opcional)",
    reviewPlaceholder: "Comparte tu experiencia con nosotros...",
    submitBtn: "Publicar Reseña",
    anonymous: "Anónimo",
    loading: "Cargando reseñas...",
  },
};

export function Reviews({ lang }: ReviewsProps) {
  const c = t[lang];
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;

    setIsSubmitting(true);
    
    const finalName = name.trim() === "" ? c.anonymous : name.trim();
    
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        { name: finalName, rating, comment: comment.trim() }
      ])
      .select();

    if (error) {
      console.error("Error inserting review:", error);
    } else if (data && data.length > 0) {
      setReviews([data[0], ...reviews]);
      setName("");
      setRating(0);
      setHoverRating(0);
      setComment("");
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-24 bg-white/50 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {c.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Review Form */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {c.formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder={c.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex gap-1 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  placeholder={c.reviewPlaceholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none text-gray-800 placeholder:text-gray-400"
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={rating === 0 || comment.trim() === "" || isSubmitting}
                className="w-full py-6 rounded-xl font-semibold text-base transition-all bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "..." : c.submitBtn}
              </Button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-8">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500 font-light">
                {c.loading}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence>
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-transparent text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6 font-light">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-medium text-gray-900">
                          {review.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
