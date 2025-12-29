import { Star } from 'lucide-react';

interface RatingProps {
    rating: number;
    showNumber?: boolean;
    size?: number;
}

export default function Rating({ rating, showNumber = true, size = 16 }: RatingProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div className="stars">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} size={size} fill="#f59e0b" className="star" />
                ))}
                {hasHalfStar && (
                    <Star key="half" size={size} fill="#f59e0b" className="star" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} size={size} className="star-empty" />
                ))}
            </div>
            {showNumber && (
                <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.25rem' }}>
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
