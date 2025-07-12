<script setup lang="ts">
export interface Testimonial {
  avatar: string
  name: string
  comment: string[]
  rating?: number 
}

const props = defineProps<{
  testimonial: Testimonial;
}>();

const stars = (rating: number | undefined) => {
  if (rating === undefined || rating < 0 || rating > 5) return [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  const starArray = [];
  for (let i = 0; i < fullStars; i++) starArray.push('full');
  if (halfStar) starArray.push('half');
  for (let i = 0; i < emptyStars; i++) starArray.push('empty');
  
  return starArray;
};

</script>

<template>
  <div class="community-card">
    <div class="card__header">
      <img
        :src="props.testimonial.avatar" 
        :alt="props.testimonial.name"   
        class="card__avatar"
      />
      <div class="card__meta">
        <span class="card__name">
          {{ props.testimonial.name }} 
        </span>
        <div class="star-rating">
          <span 
            v-for="(starType, index) in stars(props.testimonial.rating)" 
            :key="index" 
            :class="['star', starType]"
          >
            <template v-if="starType === 'full'">&#9733;</template> 
            <template v-else-if="starType === 'half'">&#9733;</template> 
            <template v-else>&#9734;</template> 
          </span>
        </div>
      </div>
    </div>
    <div class="card__content">
      <p v-for="(p, index) of props.testimonial.comment" :key="index">{{ p }}</p> 
    </div>
  </div>
</template>

<style scoped>
/* لا تغيير في الـ Style */
.community-card {
  width: 100%; 
  margin-bottom: 25px; 
  border-radius: 12px;
  border: 1px solid rgba(38, 38, 38, 0.7);
  background: #161616;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 1; 
  transform: translateY(0); 


  .card__avatar {
    width: 48px;
    aspect-ratio: 1;
    border-radius: 100%;
    object-fit: cover; 
  }

  .card__content {
    color: #a3a3a3;
    font-family: 'Tajawal', sans-serif; 
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.32px;
    text-wrap: pretty;
    cursor: default;
    text-align: right; 
  }

  .card__content p {
    margin-top: 10px;
  }

  .card__header {
    display: flex;
    flex-direction: row-reverse; 
    gap: 20px;
    align-items: center;
  }

  .card__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
  }

  .card__name {
    color: #fff;
    font-family: 'Tajawal', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.3px;
    text-align: right;
  }

  .star-rating {
    display: flex;
    direction: ltr; 
    margin-top: 4px;
  }

  .star {
    font-size: 1.1em; 
    margin: 0 1px;
    color: #ffd700; 
  }

  .star.empty {
    color: #555; 
  }
}
</style>