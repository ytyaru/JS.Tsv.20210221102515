export default Filter {
    static filter(data, key, where) {
        return data.filter(row=>where(row))
    }
}
