export default defineAppConfig({
  title: 'OpenAI KeyTools',
  description: 'OpenAI KeyTools',
  ui: {
    primary: 'emerald',
    container: {
      constrained: 'max-w-2xl'
    },
    card: {
      header: {
        base: 'flex flex-wrap items-center justify-between'
      },
      body: {
        base: 'space-y-4'
      }
    },
    dropdown: {
      width: 'w-full',
      popper: {
        strategy: 'absolute'
      }
    },
    table: {
      th: {
        base: 'text-left rtl:text-right bg-indigo-500',
        padding: 'px-3 py-3.5',
        color: 'text-white',
        font: 'font-semibold',
        size: 'text-sm'
      },
    }
  }
})