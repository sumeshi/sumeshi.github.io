<template>
  <v-card class="mt-5 pa-4" justify="center">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="font-weight-black">$WHOAMI</v-card-title>
          <v-card-text>
            <v-card>
              <v-card-title>About me</v-card-title>
                <v-card-text>
                  I am a security engineer working in Japan, focusing on forensics and malware analysis.<br>
                  My interests extend beyond security to include new programming languages, design patterns, and technologies.<br>
                  I am primarily active on Twitter and welcome discussions there.<br>
                  Thank you.
                </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Career and Experience</v-card-title>
                <v-card-text>
                  <h3>From Bachelor's Year 4 to Master's Year 2:</h3>
                  <p class="position mt-2 text-caption grey-lighten-2">
                  - Worked as a Web Engineer for 2 years at a Japanese venture company.
                  - Focused on front-end development with Angular and back-end development with Python.
                  - Developed a full-text search feature utilizing Elasticsearch and machine learning, performed PostgreSQL performance tuning, and created efficient data search queries.
                  </p>

                  <h3 class="mt-5">After Master's Degree to Present:</h3>
                  <p class="position mt-2 text-caption grey-lighten-2">
                  - Engaged in cybersecurity research at a Japanese IT company.
                  - Specialized in incident response and forensics, malware analysis, and threat intelligence.
                  </p>
                </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Projects and Contributions</v-card-title>
                <v-card-text>
                  <h3><a href="https://github.com/sumeshi/evtx2es">evtx2es</a>, <a href="https://github.com/sumeshi/mft2es">mft2es</a>:</h3>
                  <p class="position mt-2 text-caption grey-lighten-2">
                  - Python tools for importing Windows artifacts into Elasticsearch.
                  - Included as standard in the DFIR-focused Linux distribution [Tsurugi Linux LAB](https://tsurugi-linux.org) 2022.1 - 2023.1.
                  </p>

                  <h3 class="mt-5"><a href="https://github.com/sumeshi/ntfsdump">ntfsdump</a>, <a href="https://github.com/sumeshi/ntfsfind">ntfsfind</a>:</h3>
                  <p class="position mt-2 text-caption grey-lighten-2">
                  - Forensic tools for extracting Windows artifacts from image files.
                  </p>
                </v-card-text>
            </v-card>

          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
</style>
