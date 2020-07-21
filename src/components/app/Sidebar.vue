<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title | localize}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: "Page_Bill", url: "/", exact: true },
      { title: "Page_History", url: "/history" },
      { title: "Page_Planing", url: "/planning" },
      { title: "Page_New_Record", url: "/record" },
      { title: "Page_Category", url: "/categories" }
    ]
  })
};
</script>
