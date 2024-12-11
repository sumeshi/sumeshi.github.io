<template>
  <v-card class="mt-5 pa-4" justify="center">
    <v-row>
      <v-col>
        <v-btn-toggle class="d-flex justify-end" v-model="togglelang">
          <v-btn height="32"><p class="text-overline">EN</p></v-btn>
          <v-btn height="32"><p class="text-overline">JA</p></v-btn>
        </v-btn-toggle>
        <v-parallax class="mb-8" src="/img/blurdog.jpg" scale=0.9 height="200">
          <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <p class="subheading">
              <b>"Do one thing every day that scares you."</b>
            </p>
            <p class="caption">
              — Mary Schmich, Chicago Tribune, 1 June 1997
            </p>
          </div>
        </v-parallax>
        <v-card class="elevation-0">
          <v-card-title class="font-weight-black">$ whoami</v-card-title>
          <v-card-text>
            <div v-for="a in togglelang ? aboutme_ja : aboutme_en">
              <p class="pb-2">{{ a }}</p>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="elevation-0">
          <v-card-title class="font-weight-black">$ history</v-card-title>
          <v-card-text>
            <div v-for="(hv, hk) in togglelang ? history_ja : history_en" :key="hk" >
              <h3 class="mt-2 mb-2">{{ hk }}</h3>
              <ul v-for="hvv in hv" :key="hvv" >
                <li class="pb-2">{{ hvv }}</li>
              </ul>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="elevation-0">
          <v-card-title class="font-weight-black">$ ls /usr/local/bin</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Category</th>
                  <th class="text-left">Technologies</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tv, tk) in techstack" :key="tk" >
                  <td>{{ tk }}</td>
                  <v-list nav density="compact">
                    <v-list-item
                      v-for="tvv in tv"
                      :key="tvv"
                      :title="tvv"
                      class="pa-0 ma-0"
                      slim
                    ></v-list-item>
                  </v-list>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const togglelang = ref(0)

const aboutme_en = ref([
  'I work as a security engineer in Japan, specializing in incident response. I have particular expertise in digital forensics and malware analysis.',
  'In my spare time, I’m interested in system development, and I occasionally create and release the tools I need.',
  'I’m often active on GitHub and X, so feel free to reach out anytime.'
]);

const aboutme_ja = ref([
  'デジタルフォレンジックとかマルウェア解析とかやってるセキュリティエンジニアです。',
  'ぶっちゃけセキュリティよりはシステム開発とかのが好きなので、そっち方向の知見のほうが多いかも。暇なときにツールつくってGitHubで公開とかしてます。',
]);

const history_en = ref({
  'From Bachelor\'s Year 4 to Master\'s Year 2': [
    'Worked as a Web Engineer at an IT venture company for 3 years',
    'Front-end development using Angular and Vue',
    'Back-end development using Django REST framework',
    'Developed full-text search features utilizing Elasticsearch and machine learning',
    'Improved PostgreSQL performance and tuned high-efficiency data structures and queries',
    'Introduced and optimized GitLab and GitLab CI',
    'Developed a log analysis system',
    'Developed forensic tools'
  ],
  'After Completing Master\'s Degree to Present': [
    'Digital Forensic Researcher',
    'Malware Analyst',
    'Providing threat intelligence information',
    'Lecturer for university courses on incident response',
    'Participation in security contests'
  ]
});

const history_ja = ref({
  '学部4年生から修士2年生まで': [
    'ITベンチャー企業で3年間Webエンジニアとして勤務',
    'Angular, Vueを使ったフロントエンド開発',
    'Django REST frameworkを使ったバックエンド開発',
    'Elasticsearchと機械学習を活用した全文検索機能の開発',
    'PostgreSQLのパフォーマンス改善, 高効率なデータ構造・クエリのチューニング',
    'GitLab, GitLab CIの導入とパフォーマンス改善',
    'ログ分析システムの開発',
    'フォレンジックツールの開発',
  ],
  '修士課程から現在まで': [
    'デジタルフォレンジックリサーチャー',
    'マルウェアアナリスト',
    '脅威インテリジェンス情報の発信',
    'インシデントレスポンスに関する大学授業の講師',
    'セキュリティコンテストへの参加',
  ]
});

const techstack = ref({
  "Frontend Dev": ["HTML", "CSS", "TypeScript", "JavaScript", "Vue", "Angular"],
  "Backend Dev": ["Python", "Go", "TypeScript", "Ruby", "PHP"],
  "Software Dev": ["Python", "C++", "Rust", "Java", "Go", "C# (.NET)", "Nim", "Swift"],
  "DBMS": ["PostgreSQL", "Elasticsearch", "SQLite", "MongoDB", "MySQL"],
  "Virtualization": ["Proxmox", "ESXi", "Hyper-V", "KVM", "Docker", "Kubernetes"],
  "CI/CM": ["GitLab CI", "GitHub Actions", "Ansible"]
});
</script>
