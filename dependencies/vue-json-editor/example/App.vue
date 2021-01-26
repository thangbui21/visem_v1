<template>
  <div class="example-json">
    <vue-json-editor v-model="json" 
      :show-btns="true" 
      :mode="'code'" 
      lang="zh"
      @json-change="onJsonChange" 
      @json-save="onJsonSave" 
      @has-error="onError">   
    </vue-json-editor>
  </div>
</template>

<script>
import vueJsonEditor from '../vue-json-editor.vue'
export default {
  data () {
    return {
      json: {
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}
    }
  },

  components: {
    vueJsonEditor
  },

  methods: {
    onJsonChange (value) {
      console.log('value:', value);
    },

    onJsonSave (value) {
      console.log('value:', value);
    },

    onError (value) {
      console.log('value:', value);
    },

    resetJson () {
      this.json = [
        {"name": "Dirk", "age": 1234},
        {"name": "Jason"}
      ]
    }
  }
}
</script>
