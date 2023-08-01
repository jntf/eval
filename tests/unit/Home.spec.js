import { shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";
// import Home from '@/views/Home.vue'

describe("Home.vue", () => {
  it("renders without errors", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.exists()).toBe(true);
  });
  // Compter le nombre de .pricing qu'il soit 4
  it("renders 4 pricing cards", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.findAll(".pricing").length).toBe(4);
  });
});
