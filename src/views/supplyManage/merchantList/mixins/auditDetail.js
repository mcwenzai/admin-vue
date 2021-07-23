export const auditDetailMixin = {
	data() {
		return {
			value: {},
		}
	},
	created() {
		this.loading = false
		this.id = this.$route.query.id
		this.getDetailById(this.id)
	},
	methods: {},
}
