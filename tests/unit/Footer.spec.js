import { mount } from '@vue/test-utils'
import Footer from '../../src/components/home/Footer.vue'

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = mount(Footer)
    expect(wrapper.exists()).toBe(true)
  })

  it('contains all the necessary links', () => {
    const wrapper = mount(Footer)
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(9)
    expect(links[0].attributes('href')).toBe('/home#acceuil')
    expect(links[1].attributes('href')).toBe('/home#presentation')
    expect(links[2].attributes('href')).toBe('/home#comment-ca-marche')
    expect(links[3].attributes('href')).toBe('/home#nous-contacter')
    expect(links[4].attributes('href')).toBe('/home#tarifs')
  })
})