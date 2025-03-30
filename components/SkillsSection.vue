<template>
    <main class="pt-15 lg:pt-0 text-white">
        <div
          class="text-center mb-16 transition-opacity duration-1000">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        <section class="container mx-auto px-4 py-11">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkillCard v-for="(category, index) in skillCategories" :key="index" :icon="category.icon"
                    :title="category.title" :skills="category.skills" :color="category.color" />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import SkillCard from '~/components/SkillCard.vue';

interface Skill {
    name: string;
    icon: Component;
}

interface SkillCategory {
    icon: Component;
    title: string;
    color: string;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
            return {
                setup() {
                    return () => h(icon, { icon: 'lucide:code-2' });
                }
            };
        })),
        title: "Frontend Development",
        color: "text-blue-400",
        skills: [
            {
                name: "React",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'fa6-brands:react', class: 'w-4 h-4 text-[#61DAFB]' });
                        }
                    };
                }))
            },
            {
                name: "Next.js",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'simple-icons:nextdotjs', class: 'w-4 h-4 text-white' });
                        }
                    };
                }))
            },
            {
                name: "TypeScript",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'simple-icons:typescript', class: 'w-4 h-4 text-[#3178C6]' });
                        }
                    };
                }))
            },
            {
                name: "Tailwind CSS",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'simple-icons:tailwindcss', class: 'w-4 h-4 text-[#38B2AC]' });
                        }
                    };
                }))
            },
            {
                name: "HTML5",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'bi:file-earmark-code', class: 'w-4 h-4 text-[#E34F26]' });
                        }
                    };
                }))
            },
            {
                name: "CSS3",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'bi:file-earmark-code', class: 'w-4 h-4 text-[#1572B6]' });
                        }
                    };
                }))
            },
        ],
    },
    {
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
            return {
                setup() {
                    return () => h(icon, { icon: 'lucide:database' });
                }
            };
        })),
        title: "Backend Development",
        color: "text-green-400",
        skills: [
            {
                name: "Node.js",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'fa6-brands:node-js', class: 'w-4 h-4 text-[#339933]' });
                        }
                    };
                }))
            },
            {
                name: "Python",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'fa6-brands:python', class: 'w-4 h-4 text-[#3776AB]' });
                        }
                    };
                }))
            },
            {
                name: "PostgreSQL",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'simple-icons:postgresql', class: 'w-4 h-4 text-[#336791]' });
                        }
                    };
                }))
            },
            {
                name: "MongoDB",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'simple-icons:mongodb', class: 'w-4 h-4 text-[#47A248]' });
                        }
                    };
                }))
            },
            {
                name: "REST APIs",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'bi:grid-1x2', class: 'w-4 h-4 text-[#FF6C37]' });
                        }
                    };
                }))
            },
            {
                name: "GraphQL",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'simple-icons:graphql', class: 'w-4 h-4 text-[#E10098]' });
                        }
                    };
                }))
            },
        ],
    },
    {
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
            return {
                setup() {
                    return () => h(icon, { icon: 'lucide:cloud' });
                }
            };
        })),
        title: "Cloud & DevOps",
        color: "text-orange-400",
        skills: [
            {
                name: "AWS",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'fa6-brands:aws', class: 'w-4 h-4 text-[#FF9900]' });
                        }
                    };
                }))
            },
            {
                name: "Docker",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'fa6-brands:docker', class: 'w-4 h-4 text-[#2496ED]' });
                        }
                    };
                }))
            },
            {
                name: "Kubernetes",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'bi:grid-1x2', class: 'w-4 h-4 text-[#326CE5]' });
                        }
                    };
                }))
            },
            {
                name: "Git",
                icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => {
                    return {
                        setup() {
                            return () => h(icon, { icon: 'fa6-brands:git-alt', class: 'w-4 h-4 text-[#F05032]' });
                        }
                    };
                }))
            },
        ],
    },
    {
    icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
      setup() {
        return () => h(icon, { icon: 'lucide:layout' });
      }
    }))),

    title: "UI/UX Design",
    color: "text-purple-400",
    skills: [
      {
        name: "Figma",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'fa6-brands:figma', class: 'w-4 h-4 text-[#F24E1E]' });
          }
        })))
      },
      {
        name: "Responsive Design",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'lucide:layout', class: 'w-4 h-4 text-[#38B2AC]' });
          }
        })))
      },
      {
        name: "Wireframing",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'bi:grid-1x2', class: 'w-4 h-4 text-[#9CA3AF]' });
          }
        })))
      },
      {
        name: "Prototyping",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'mdi:animation', class: 'w-4 h-4 text-[#F59E0B]' });
          }
        })))
      },
    ],
  },
  {
    icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
      setup() {
        return () => h(icon, { icon: 'lucide:cpu' });
      }
    }))),

    title: "Tools & Technologies",
    color: "text-pink-400",
    skills: [
      {
        name: "VS Code",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:visualstudiocode', class: 'w-4 h-4 text-[#007ACC]' });
          }
        })))
      },
      {
        name: "Jest",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:jest', class: 'w-4 h-4 text-[#C21325]' });
          }
        })))
      },
      {
        name: "Webpack",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:webpack', class: 'w-4 h-4 text-[#8DD6F9]' });
          }
        })))
      },
      {
        name: "Redux",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:redux', class: 'w-4 h-4 text-[#764ABC]' });
          }
        })))
      },
      {
        name: "Firebase",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:firebase', class: 'w-4 h-4 text-[#FFCA28]' });
          }
        })))
      },
      {
        name: "Vercel",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:vercel', class: 'w-4 h-4 text-white' });
          }
        })))
      },
      {
        name: "Vite",
        icon: defineAsyncComponent(() => import('@iconify/vue').then(mod => mod.Icon).then(icon => ({
          setup() {
            return () => h(icon, { icon: 'simple-icons:vite', class: 'w-4 h-4 text-[#646CFF]' });
          }
        })))
      },
    ],
  },
]
</script>

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.animate-shimmer {
    animation: shimmer 2s infinite;
}
</style>