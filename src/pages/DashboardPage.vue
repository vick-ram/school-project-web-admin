<template>
  <div class="q-pa-md">
    <div class="q-gutter-md dashboard-cards">
      <q-card class="col">
        <q-card-section>
          <h4 class="text-align-center">Customer Data</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            expedita temporibus deserunt. Dicta eaque adipisci molestias. Iure
            commodi praesentium amet ipsum sequi libero cumque maiores
            dignissimos, necessitatibus corrupti debitis impedit.
          </p>
        </q-card-section>
      </q-card>
      <q-card class="col">
        <q-card-section>
          <h4 class="text-align-center">Supplier Data</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
            voluptate rerum qui provident perferendis voluptatibus sed, vel
            sequi impedit, pariatur voluptatem quis illo possimus non eaque
            distinctio amet dolor? Earum.
          </p>
        </q-card-section>
      </q-card>
      <q-card class="col">
        <q-card-section>
          <h4 class="text-align-center">Employee Data</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aut
            ducimus quae nam quo magnam nihil iusto harum itaque perspiciatis
            incidunt molestiae laboriosam, deleniti saepe? Autem a commodi
            saepe! Rerum?
          </p>
        </q-card-section>
      </q-card>
      <q-card class="col">
        <q-card-section>
          <h4 class="text-align-center">Employee Data</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aut
            ducimus quae nam quo magnam nihil iusto harum itaque perspiciatis
            incidunt molestiae laboriosam, deleniti saepe? Autem a commodi
            saepe! Rerum?
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.dashboard-cards {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dashboard-cards q-card {
  display: flex;
  flex: 1;
}
@media (max-width: 768px) {
  .dashboard-cards {
    flex-direction: column;
  }
}
</style>
