import { shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";

describe("Home.vue", () => {
  it("renders without errors", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.exists()).toBe(true);
  });
  // Compter le nombre de .pricing qu'il soit 4
  it("rendu de 4 cartes de prix", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.findAll(".pricing").length).toBe(4);
  });
});
