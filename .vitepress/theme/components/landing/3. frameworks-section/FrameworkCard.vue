<script setup lang="ts">
import { Ref, ref, computed } from 'vue'

export interface Framework {
  title?: string // سيعرض اسم الشركة/المشروع
  description?: string // سيعرض نوع المبنى/المكان
  logo?: string
  color?: string // تم الإبقاء عليه لخاصية التوهج
  url?: string
  visible: Ref<boolean>
}

interface Props {
  framework?: Framework
}

const props = withDefaults(defineProps<Props>(), {
  framework: () => ({
    visible: ref(true),
  }),
})

const hasContent = computed(() => {
  return props.framework && (props.framework.title || props.framework.logo); // التأكد من وجود عنوان أو شعار
});
</script>

<template>
  <component
    :is="props.framework?.url && hasContent ? 'a' : 'div'"
    :href="props.framework?.url && hasContent ? props.framework.url : undefined"
    target="_blank"
    rel="noopener"
    class="framework-card"
    :style="{ '--glow-color': props.framework?.color }"
    :class="{ 
        active: props.framework?.visible.value === true && hasContent, 
        'is-empty': !hasContent 
    }"
  >
    <template v-if="hasContent">
      <div v-if="props.framework?.logo" class="card-icon">
        <img :src="props.framework.logo" :alt="props.framework.title || 'Project Logo'">
      </div>

      <div class="card-content">
        <h3 v-if="props.framework?.title">{{ props.framework.title }}</h3>
        <p v-if="props.framework?.description" class="project-description">{{ props.framework.description }}</p> </div>
    </template>
  </component>
</template>

<style scoped>
.framework-card {
  width: 250px;
  min-height: 220px;
  border-radius: 12px;
  border: 1px solid rgba(38, 38, 38, 0.7);
  background: #181818;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  --glow-color: rgba(0, 0, 0, 0); 
  opacity: 1;
  transition: opacity 0.4s ease;
  user-select: none;
  text-decoration: none;
  color: inherit;
  text-align: center;
  box-sizing: border-box;
}

.framework-card.is-empty {
  opacity: 0.1;
  background: rgba(38, 38, 38, 0.2);
  border-color: rgba(38, 38, 38, 0.1);
  pointer-events: none;
  transform: none !important;
}

.card-icon {
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 8px;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: drop-shadow(
    0 0 0.8rem color-mix(in srgb, var(--glow-color) 40%, transparent)
  ); 
  transition: transform 0.3s ease;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}

.card-content h3 {
  margin: 0;
  font-size: 1em;
  color: #fdfdfd;
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
}

.project-description { /* كلاس جديد لوصف المشروع/المكان */
  margin: 5px 0 0;
  font-size: 0.85em;
  color: #ccc;
  line-height: 1.2;
}

.framework-card.active {
  opacity: 1;
}

.framework-card:not(.is-empty):hover {
  .card-icon img {
    transform: scale(1.05);
    will-change: transform;
  }

  &:before {
    opacity: 0.7;
  }
}

.framework-card:not(.is-empty) {
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 5%;
    left: 5%;
    right: 5%;
    bottom: 5%;
    background-color: var(--glow-color); 
    filter: blur(10px);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
    will-change: opacity;
    border-radius: 12px;
  }
}
</style>