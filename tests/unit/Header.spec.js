import { shallowMount } from "@vue/test-utils";
import Header from "../../src/components/home/Header.vue";

describe("Header.vue", () => {
  it("renders company name", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.text()).toMatch("EvaluIA");
  });

  it("toggles menu on button click", () => {
    const wrapper = shallowMount(Header);
    const button = wrapper.find(".navbar-burger");
    button.trigger("click");
    expect(wrapper.vm.isActive).toBe(true);
  });

  it("renders navigation links", () => {
    const wrapper = shallowMount(Header);
    const links = wrapper.findAll(".navbar-menu a");
    expect(links.length).toBe(5);
    expect(links.at(0).text()).toMatch("Accueil");
    expect(links.at(1).text()).toMatch("Présentation");
    expect(links.at(2).text()).toMatch("Comment ça marche");
    expect(links.at(3).text()).toMatch("Tarifs");
    expect(links.at(4).text()).toMatch("Nous contacter");
  });
});
