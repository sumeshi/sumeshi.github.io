<template>
  <v-card class="mt-5 pa-4" justify="center">
    <v-row>
      <v-col>
        <v-card class="elevation-0">
          <v-card-title class="font-weight-black">$ whoami</v-card-title>
          <v-card-text>
            <v-card class="elevation-0">
              <v-card-title>About Me</v-card-title>
              <v-card-text class="text-body-2">
                <p class="pb-2">I am a security engineer working in Japan, focusing on forensics and malware analysis.</p>
                <p class="pb-2">My interests extend beyond security to include new programming languages, design patterns, and technologies.</p>
                <p class="pb-2">I am primarily active on Twitter and welcome discussions there.</p>
                <p class="pb-2">Thank you.</p>
              </v-card-text>
            </v-card>

            <v-card class="elevation-0">
              <v-card-title>Career and Experience</v-card-title>
                <v-card-text>
                  <h3 class="mt-2 mb-2">From Bachelor's Year 4 to Master's Year 2:</h3>
                  <ul>
                    <li class="pb-2">Worked as a Web Engineer for 2 years at a Japanese venture company.</li>
                    <li class="pb-2">Focused on front-end development with Angular and back-end development with Python.</li>
                    <li class="pb-2">Developed a full-text search feature utilizing Elasticsearch and machine learning, performed PostgreSQL performance tuning, and created efficient data search queries.</li>
                  </ul>

                  <h3 class="mt-5 mb-2">After Master's Degree to Present:</h3>
                  <ul>
                    <li class="pb-2">Engaged in cybersecurity research at a Japanese IT company.</li>
                    <li class="pb-2">Specialized in incident response and forensics, malware analysis, and threat intelligence.</li>
                  </ul>
                </v-card-text>
            </v-card>

            <v-card class="elevation-0">
              <v-card-title>Projects and Contributions</v-card-title>
                <v-card-text>
                  <h3 class="mt-2 mb-2"><a href="https://github.com/sumeshi/evtx2es" target="_blank" rel="noopener noreferrer">evtx2es</a>, <a href="https://github.com/sumeshi/mft2es" target="_blank" rel="noopener noreferrer">mft2es</a>:</h3>
                  <ul>
                    <li class="pb-2">Python tools for importing Windows artifacts into Elasticsearch.</li>
                    <li class="pb-2">Included as standard in the DFIR-focused Linux distribution <a href="https://tsurugi-linux.org" target="_blank" rel="noopener noreferrer">Tsurugi Linux LAB</a> 2022.1 - 2023.1.</li>
                  </ul>

                  <h3 class="mt-2 mb-2"><a href="https://github.com/sumeshi/ntfsdump" target="_blank" rel="noopener noreferrer">ntfsdump</a>, <a href="https://github.com/sumeshi/ntfsfind" target="_blank" rel="noopener noreferrer">ntfsfind</a>:</h3>
                  <ul>
                    <li class="pb-2">Forensic tools for extracting Windows artifacts from image files.</li>
                  </ul>
                </v-card-text>
            </v-card>

            <v-card class="elevation-0">
              <v-card-title>Tech Stack</v-card-title>
                <v-card-text>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <b>Category</b>
                        </th>
                        <th class="text-left">
                          <b>Technologies</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Programming Languages/Frameworks</td>
                        <td>
                          <tr>
                            <h4>Frontend</h4>
                            <td>HTML, CSS, JavaScript, TypeScript, Vue, Nuxt, Angular</td>
                          </tr>
                          <tr>
                            <h4>Backend</h4>
                            <td>Python, TypeScript, Go, Ruby, Java, PHP</td>
                          </tr>
                          <tr>
                            <h4>Others</h4>
                            <td>Rust, Nim, C++, C#(.NET), Julia, Swift</td>
                          </tr>
                        </td>
                      </tr>
                      <tr>
                        <td>Infrastructure</td>
                        <td>
                          <tr>
                            <h4>Virtualization</h4>
                            <td>Proxmox, ESXi, Hyper-V, Docker, Vmware Workstation, VirtualBox</td>
                          </tr>
                          <tr>
                            <h4>DataBase</h4>
                            <td>PostgreSQL, Elasticsearch, SQLite, MongoDB, MySQL</td>
                          </tr>
                          <tr>
                            <h4>CI/Environment</h4>
                            <td>GitLab CI, GitHub Actions, CircleCI, Ansible</td>
                          </tr>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
            </v-card>

          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
ul {
  list-style-position: outside;

  li {
    margin-left: 1em;
  }
}

h4 {
  margin: 1em;
}
</style>
