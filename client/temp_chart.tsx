{/* SVG Line Chart */}
                    <div className="ml-6 h-full relative">
                      <svg 
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* Grid lines */}
                        <defs>
                          <pattern id="grid" width="10" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.1" className={isDarkMode ? 'text-gray-600' : 'text-gray-200'} />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                        
                        {isGrowthExpanded ? (
                          // Full year view line chart
                          <>
                            {/* New Hires Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#9ca3af' : '#374151'}
                              strokeWidth="0.8"
                              points="4,23 12,35 20,58 28,21 36,30 44,52 52,17 60,32 68,18 76,42 84,28 92,55"
                            />
                            {/* New Hires Points */}
                            <circle cx="4" cy="23" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="12" cy="35" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="20" cy="58" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="28" cy="21" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="36" cy="30" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="44" cy="52" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="52" cy="17" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="60" cy="32" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="68" cy="18" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="76" cy="42" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="84" cy="28" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="92" cy="55" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            
                            {/* Exit Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
                              strokeWidth="0.8"
                              strokeDasharray="2,1"
                              points="4,77 12,76 20,64 28,68 36,76 44,84 52,82 60,72 68,85 76,74 84,80 92,88"
                            />
                            {/* Exit Points */}
                            <circle cx="4" cy="77" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="12" cy="76" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="20" cy="64" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="28" cy="68" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="36" cy="76" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="44" cy="84" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="52" cy="82" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="60" cy="72" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="68" cy="85" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="76" cy="74" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="84" cy="80" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="92" cy="88" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                          </>
                        ) : (
                          // Condensed view line chart (last 6 months)
                          <>
                            {/* New Hires Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#9ca3af' : '#374151'}
                              strokeWidth="1"
                              points="8,52 24,30 40,21 56,58 72,35 88,23"
                            />
                            {/* New Hires Points */}
                            <circle cx="8" cy="52" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="24" cy="30" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="40" cy="21" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="56" cy="58" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="72" cy="35" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="88" cy="23" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            
                            {/* Exit Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
                              strokeWidth="1"
                              strokeDasharray="2,1"
                              points="8,84 24,76 40,68 56,64 72,76 88,77"
                            />
                            {/* Exit Points */}
                            <circle cx="8" cy="84" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="24" cy="76" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="40" cy="68" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="56" cy="64" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="72" cy="76" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="88" cy="77" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                          </>
                        )}
                      </svg>
                      
                      {/* Month Labels */}
                      <div className="absolute bottom-0 left-0 w-full flex justify-between items-end h-6">
                        {isGrowthExpanded ? (
                          <>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jan</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Feb</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mar</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Apr</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>May</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jun</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jul</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aug</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sep</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Oct</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nov</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dec</span>
                          </>
                        ) : (
                          <>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jun</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>May</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Apr</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mar</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Feb</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jan</span>
                          </>
                        )}
                      </div>
                    </div>
