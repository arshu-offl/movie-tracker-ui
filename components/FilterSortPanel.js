'use client';
import styles from '../styles/FilterSortPanel.module.css';

export default function FilterSortPanel({ 
  filter, 
  setFilter, 
  sort, 
  setSort, 
  searchQuery,
  setSearchQuery,
  totalMovies, 
  watchedCount 
}) {
  return (
    <div className={`${styles.panel} glass`}>
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{totalMovies}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{watchedCount}</span>
          <span className={styles.statLabel}>Watched</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{totalMovies - watchedCount}</span>
          <span className={styles.statLabel}>Remaining</span>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="search">Search</label>
          <input 
            id="search"
            type="text"
            placeholder="Search movie titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="filter">Filter</label>
          <select 
            id="filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Movies</option>
            <option value="watched">Watched Only</option>
            <option value="unwatched">Unwatched Only</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="sort">Sort By</label>
          <select 
            id="sort"
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className={styles.select}
          >
            <option value="default">Date Added (Newest)</option>
            <option value="alpha_asc">Alphabetical (A-Z)</option>
            <option value="alpha_desc">Alphabetical (Z-A)</option>
            <option value="rating_desc">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
