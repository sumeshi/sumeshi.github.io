<template>
  <v-card class="pa-4" justify="center">
    <v-row class="d-flex flex-column flex-sm-row" >
      <v-card class="elevation-0">
        <v-card-title class="font-weight-black">$ ps aux</v-card-title>
          <v-card-text>
            <h3 class="mt-4 mb-2"><a href="https://github.com/sumeshi/evtx2es" target="_blank" rel="noopener noreferrer">evtx2es</a>, <a href="https://github.com/sumeshi/mft2es" target="_blank" rel="noopener noreferrer">mft2es</a>:</h3>
            <ul>
              <li class="pb-2">Python tools for importing Windows artifacts into Elasticsearch.</li>
              <li class="pb-2">Included as standard in the DFIR-focused Linux distribution <a href="https://tsurugi-linux.org" target="_blank" rel="noopener noreferrer">Tsurugi Linux LAB</a> 2022.1 - 2024.1.</li>
            </ul>

            <h3 class="mt-4 mb-2"><a href="https://github.com/sumeshi/ntfsdump" target="_blank" rel="noopener noreferrer">ntfsdump</a>, <a href="https://github.com/sumeshi/ntfsfind" target="_blank" rel="noopener noreferrer">ntfsfind</a>:</h3>
            <ul>
              <li class="pb-2">Forensic tools for extracting Windows artifacts from image files.</li>
            </ul>

            <h3 class="mt-4 mb-2"><a href="https://github.com/sumeshi/quilter-csv" target="_blank" rel="noopener noreferrer">Quilter-CSV</a></h3>
            <ul>
              <li class="pb-2">A tool that provides elastic and rapid filtering for efficient analysis of huge CSV files, such as eventlogs.</li>
            </ul>
          </v-card-text>
          <div class="d-flex justify-center ma-4">
            <BaseButtonExternal
              variant="outlined"
              class="text-caption"
              message="GitHub | @sumeshi"
              link="https://github.com/sumeshi"
              color="white"
            />
          </div>
        </v-card>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
useHead({
  title: 'Works',
})
</script>