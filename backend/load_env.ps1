ForEach($line in $(gc -pa .env)) {
    $lineSplit = $line.split("=")
    $envName = $lineSplit[0]
    $envValue = $lineSplit[1]
    ni env:\$envName -f -v "$envValue"
}