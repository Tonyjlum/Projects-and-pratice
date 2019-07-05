require 'set'
# require 'byebug'
class Game
	def initialize(word, max_guesses_allowed=50)
		@num_guesses = 0
		@max_guesses_allowed = max_guesses_allowed
		@letters_to_be_guessed = Set.new(word.split(''))
		@word = word.downcase
	end

	def game_over?
		won? or no_more_guesses?
	end

	def won?
		@letters_to_be_guessed.empty?
	end

	def no_more_guesses?
		@num_guesses >= @max_guesses_allowed
	end

	def revealed_chars
		revealed = @word.split('').map { |c| @letters_to_be_guessed.member?(c) ? '_' : c }
		revealed.join(' ')
	end

	def play(player)
		# byebug
		player.prepare(@max_guesses_allowed)
		until game_over?
			char_to_guess = player.next_guess(revealed_chars)
			@letters_to_be_guessed.delete(char_to_guess)
			@num_guesses += 1

			puts "Player guessed #{char_to_guess} resulting in these blanks #{revealed_chars}"
		end

		puts "You guessed '#{@word}' in #{@num_guesses} tries." if won?
		puts "Sorry. You've used up all #{@max_guesses_allowed} of your guesses." unless won?
		puts "The word was #{@word}. Thanks for playing!"
	end
end

## You should modify this class. As long as you keep the signature for
## Player#prepare and Player#next_guess the same. The Game should still run.
class Player
	attr_accessor :guesses, :vowels, :very_common, :pretty_common
	# could enter a previous words list, the player may learn all of the words over time for each winning word.
	# @@winning_words = []

	def initialize
		@guesses = []
		@vowels = "aeiou".chars
		@very_common = "tainoshr".chars.shuffle
		@pretty_common = "dlucm".chars.shuffle
		@last_guess = ""
	end

	def prepare(max_guesses_allowed)
		# not too sure what this method should do.
		nil
	end

	def next_guess(revealed_chars)
		# byebug
		current_guess = pick_a_char(revealed_chars)
		@guesses << current_guess
		@last_guess = current_guess
		current_guess
	end

	def pick_a_char(revealed_chars)
		# byebug
		# e is the most common letter, start "e" as a first guess
		current_guess = "e"
		# u always come after q
		current_guess = "u" if @last_guess == "q"
		 # "j" does not seem to be present in any of the words given.
		until !@guesses.include?(current_guess) && current_guess != "j"
			# all words have at least one vowel, if the "e" is not one, it will try to guess the vowel first.
			if !revealed_chars.chars.any? {|c| @vowels.include?(c)}
				current_guess = @vowels.shuffle.pop
			elsif @very_common.count > 5
				current_guess = @very_common.pop
			elsif @pretty_common.count > 3
				current_guess = @pretty_common.pop
			else
				current_guess = random_char_generator
			end
		end
		current_guess
	end


	def random_char_generator
		char_as_num = 97 + rand(26)
		current_guess = char_as_num.chr
	end


end

##################################################################

#I do not beleive that the player class has access to the word list. If the player did, I would remove words that cannot possiblely be the answer and rehash the possible words and guess from the most likely character.


# def remaining_words(word_list, wrong_guessed_character)
# #will sort out words that cannot be used anymore
# 	word_list.select do |word|
# 		word.chars.each do |c|
# 			!c.include?(wrong_guessed_character)
# 		end
# 	end
# end
#
# def word_hash_count(word_list)
# 	updated_character_hash = Hash.new(0)
# 	word_list.join.chars.each {|c| hash[c] +=1 }
# 	hash.sort_by {|k,v| v}.reverse
# 	updated_character_hash
# end

# def most_likely_character(character_hash)
# 	sorted_hash_by_value = character_hash.sort_by {|k,v| v}
# 	sorted_hash_by_value.last.first
# 	#this will get the largest count of characters remaining in the hash.
# end

# word_list = remaining_words
# character_hash = word_hash_count(word_list)

##################################################################

word_list = %w[
	yell
	butter
	suit
	earth
	degree
	mountain
	moon
	chivalrous
	suppose
	fanatical
	oranges
	pizzas
	wire
	pollution
	achiever
	kick
	rich
	versed
	inform
	argue
	volcano
	act
	brake
	heavy
	lethal
	hat
	comb
	glossy
	distinct
	purple
	heavenly
	decisive
	return
	incompetent
	hill
	childlike
	same
	subsequent
	caring
	flower
	left
	skinny
	lettuce
	fire
	step
	channel
	army
	spoon
	unique
	obey
	fail
	imaginary
	minor
	impress
	obsolete
	paddle
	rough
	lumpy
	unbiased
	seal
	fuzzy
	teeth
	quaint
	poised
	murder
	suspect
	branch
	recess
	first
	zealous
	lonely
	grain
	rail
	end
	flower
	announce
	famous
	current
	clean
	oil
	expect
	winter
	open
	pets
	wheel
	royal
	liquid
	lean
	sassy
	comfortable
	pathetic
	swanky
	earn
	spiritual
	terrific
	early
	plant
	sweater
	accurate
]

game = Game.new(word_list.sample)
game.play(Player.new)
